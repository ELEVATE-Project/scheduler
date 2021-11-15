const ObjectId = require('mongoose').Types.ObjectId;

const utilsHelper = require("../../generics/utils");
const httpStatusCode = require("../../generics/http-status");
const apiResponses = require("../../constants/api-responses");
const common = require('../../constants/common');
const entitiesData = require("../../db/entities/query");

module.exports = class EntityHelper {

    static async create(bodyData, _id) {
        bodyData.createdBy = ObjectId(_id);
        bodyData.updatedBy = ObjectId(_id);
        try {
            const filter = { type: bodyData.type, code: bodyData.code };
            const entity = await entitiesData.findOneEntity(filter);
            if (entity) {
                return common.failureResponse({ message: apiResponses.ENTITY_ALREADY_EXISTS, statusCode: httpStatusCode.bad_request, responseCode: 'CLIENT_ERROR' });
            }
            await entitiesData.createEntity(bodyData);
            return common.successResponse({ statusCode: httpStatusCode.created, message: apiResponses.ENTITY_CREATED_SUCCESSFULLY });
        } catch (error) {
            throw error;
        }
    }

    static async update(bodyData, _id, loggedInUserId) {
        bodyData.updatedBy = ObjectId(loggedInUserId);
        bodyData.updatedAt = new Date().getTime();
        try {
            const result = await entitiesData.updateOneEntity({ _id: ObjectId(_id) }, bodyData);
            if (result === 'ENTITY_ALREADY_EXISTS') {
                return common.failureResponse({ message: apiResponses.ENTITY_ALREADY_EXISTS, statusCode: httpStatusCode.bad_request, responseCode: 'CLIENT_ERROR' });
            } else if (result === 'ENTITY_NOT_FOUND') {
                return common.failureResponse({ message: apiResponses.ENTITY_NOT_FOUND, statusCode: httpStatusCode.bad_request, responseCode: 'CLIENT_ERROR' });
            }
            return common.successResponse({ statusCode: httpStatusCode.accepted, message: apiResponses.ENTITY_UPDATED_SUCCESSFULLY });
        } catch (error) {
            throw error;
        }
    }

    static async read(bodyData) {
        const projection = { value: 1, label: 1, _id: 0 };
        if (!bodyData.deleted) {
            bodyData.deleted = false;
        }
        try {
            const entities = await entitiesData.findAllEntities(bodyData, projection);
            return common.successResponse({ statusCode: httpStatusCode.ok, message: apiResponses.ENTITY_FETCHED_SUCCESSFULLY, result: entities });
        } catch (error) {
            throw error;
        }
    }

    static async delete(_id) {
        try {
            const result = await entitiesData.updateOneEntity({ _id: ObjectId(_id) }, { deleted: true });
            if (result === 'ENTITY_ALREADY_EXISTS') {
                return common.failureResponse({ message: apiResponses.ENTITY_ALREADY_DELETED, statusCode: httpStatusCode.bad_request, responseCode: 'CLIENT_ERROR' });
            } else if (result === 'ENTITY_NOT_FOUND') {
                return common.failureResponse({ message: apiResponses.ENTITY_NOT_FOUND, statusCode: httpStatusCode.bad_request, responseCode: 'CLIENT_ERROR' });
            }
            return common.successResponse({ statusCode: httpStatusCode.accepted, message: apiResponses.ENTITY_DELETED_SUCCESSFULLY });
        } catch (error) {
            throw error;
        }
    }
}
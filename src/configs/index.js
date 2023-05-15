/*
 *   name : configs/index.js
 *   author : Vishnudas
 *   date : 12-may-2022
 *   description : contains connection of all configs
 */
require('@configs/mongodb')()
require('@configs/kafka')()
require('@configs/agenda')
require('@configs/bull')()

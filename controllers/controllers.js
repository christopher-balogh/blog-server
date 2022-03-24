const knex = require('./dbConnection');

function createUser(username, passwordHash, first_name, last_name){
  return knex('users').insert({username, passwordHash, first_name, last_name})
}

function getPasswordHash(username){
  return ( knex('users').where({username}).select('passwordHash')
  .then(data=>data[0].passwordHash)
  )}

function selectUserProfile(username){
  return ( knex('users').where({username})
  .then(data=>data)
  )}

module.exports = {
  createUser, getPasswordHash, selectUserProfile
}
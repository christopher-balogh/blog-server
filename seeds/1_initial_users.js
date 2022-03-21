/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {first_name:"Clark", last_name: "Kent", username: "Superman", passwordHash: "ilovelois"},
    {first_name:"Bruce", last_name: "Wayne", username: "Batman", passwordHash: "iloveselina"},
    {first_name:"Diana", last_name: "Prince", username: "WonderWoman", passwordHash: "ilovesteve"}
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('posts').del()
  await knex('posts').insert([
    {
      user_id: 1,
      title: "The Sun is Awesome",
      content: "It gives me warmth. It gives me strength. It's beauty astonishes. I love you, Sun. "
    },
    {
      user_id: 2,
      title: "I Hate the Sun",
      content: "The Sun is so bright. I hate it's rays. I love the night and hate the day."
    },
    {
      user_id: 3,
      title: "I Am the Sun",
      content: "I am a Princess. I am a Goddess. Bow to me. I am the Sun. "
    }
  ]);
};

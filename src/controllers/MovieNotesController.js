const knex = require("../database/knex");

class MovieNotesController {
  async create(req, res) {
    const { title, description, score, tags } = req.body;
    const user_id = req.user.id;

    const [note_id] = await knex("movie_notes").insert({
      title,
      description,
      score,
      user_id,
    });

    const tagsInsert = tags.map((name) => {
      return {
        note_id,
        name,
        user_id,
      };
    });

    await knex("tags").insert(tagsInsert);

    return res.json();
  }

  async show(req, res) {
    const { id } = req.params;

    const movieNotes = await knex("movie_notes").where({ id }).first();
    const tags = await knex("tags").where({ note_id: id }).orderBy("name");

    return res.json({
      ...movieNotes,
      tags,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    await knex("movie_notes").where({ id }).delete();

    return res.json();
  }

  async index(req, res) {
    const { title, tags } = req.query;

    const user_id = req.user.id;

    let movie_notes;

    if (tags) {
      const filterTags = tags.split(",").map((tag) => tag.trim());

      movie_notes = await knex("tags")
        .select(["movie_notes.id", "movie_notes.title", "movie_notes.user_id"])
        .where("movie_notes.user_id", user_id)
        .whereLike("movie_notes.title", `%${title}%`)
        .whereIn("name", filterTags)
        .innerJoin("movie_notes", "movie_notes.id", "tags.note_id")
        .groupBy("movie_notes.id")
        .orderBy("movie_notes.title");
    } else {
      movie_notes = await knex("movie_notes")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title");
    }

    const userTags = await knex("tags").where({ user_id });
    const movieNotesWithTags = movie_notes.map((note) => {
      const movieNotesTags = userTags.filter((tag) => tag.note_id === note.id);

      return {
        ...movie_notes,
        tags: movieNotesTags,
      };
    });

    return res.json(movieNotesWithTags);
  }
}

module.exports = MovieNotesController;

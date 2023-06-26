/* eslint-disable no-undef */
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class SongsService {
  constructor() {
    this._songs = [];
  }

  addSong({ title, year, genre, performer, duration, albumId }) {
    const id = nanoid(16);

    const newSong = {
      id,
      title,
      year,
      genre,
      performer,
      duration,
      albumId,
    };

    this._songs.push(newSong);

    const isSuccess = this._songs.filter((song) => song.id === id).length > 0;

    if (!isSuccess) {
      throw new InvariantError('Gagal menambahkan lagu');
    }

    return id;
  }

  getSongs() {
    return this._songs;
  }

  getSongById(id) {
    const song = this._songs.find((s) => s.id === id);

    if (!song) {
      throw new NotFoundError('Lagu tidak ditemukan');
    }

    return song;
  }

  editSongById(id, { title, year, genre, performer, duration, albumId }) {
    const songIndex = this._songs.findIndex((song) => song.id === id);

    if (songIndex === -1) {
      throw new NotFoundError('Gagal memperbarui lagu. Id tidak ditemukan');
    }

    this._songs[songIndex] = {
      ...this._songs[songIndex],
      title,
      year,
      genre,
      performer,
      duration,
      albumId,
    };
  }

  deleteSongById(id) {
    const songIndex = this._songs.findIndex((song) => song.id === id);

    if (songIndex === -1) {
      throw new NotFoundError('Gagal menghapus lagu. Id tidak ditemukan');
    }

    this._songs.splice(songIndex, 1);
  }
}

module.exports = SongsService;

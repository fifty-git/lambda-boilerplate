'use strict';

const {
  getTag,
  insertTag,
  updateTag,
} = require('../models/demoModels');

const getTagService = async (tagId) => {
  const result = await getTag(tagId);
  return result;
};

const insertTagService = async (data) => {
  const result = await insertTag(data);
  return result;
};

const updateTagService = async (data) => {
  const result = await updateTag(data);
  return result;
};

module.exports = {
  getTagService,
  insertTagService,
  updateTagService,
};

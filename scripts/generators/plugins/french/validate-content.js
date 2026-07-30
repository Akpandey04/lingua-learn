const validateData = (data) => {
  console.log(`Validating data payload...`);
  if (!data.language) throw new Error("Validation Error: Missing language");
  if (!data.concepts || !Array.isArray(data.concepts)) throw new Error("Validation Error: Missing or invalid concepts array");
  if (!data.lessons || !Array.isArray(data.lessons)) throw new Error("Validation Error: Missing or invalid lessons array");
  if (!data.curriculum || !data.curriculum.units) throw new Error("Validation Error: Missing curriculum units");

  // Check for duplicate concepts
  const conceptIds = new Set();
  data.concepts.forEach(c => {
    if (conceptIds.has(c.id)) throw new Error(`Validation Error: Duplicate concept ID found: ${c.id}`);
    conceptIds.add(c.id);
  });

  // Check for duplicate lessons
  const lessonIds = new Set();
  data.lessons.forEach(l => {
    if (lessonIds.has(l.id)) throw new Error(`Validation Error: Duplicate lesson ID found: ${l.id}`);
    lessonIds.add(l.id);
  });

  console.log(`✅ Data validation passed. (${data.concepts.length} concepts, ${data.lessons.length} lessons)`);
  return true;
};

module.exports = { validateData };

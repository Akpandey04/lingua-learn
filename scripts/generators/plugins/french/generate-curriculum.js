const fs = require('fs');
const path = require('path');

const generateCurriculum = async (curriculum, language, level) => {
  if (!curriculum) return;

  const levelDir = path.join(process.cwd(), 'content', language.toLowerCase(), level.toUpperCase());
  if (!fs.existsSync(levelDir)) {
    fs.mkdirSync(levelDir, { recursive: true });
  }

  const data = {
    language: language,
    level: level.toUpperCase(),
    units: curriculum.units || []
  };

  fs.writeFileSync(path.join(levelDir, 'curriculum.json'), JSON.stringify(data, null, 2));
};

module.exports = { generateCurriculum };

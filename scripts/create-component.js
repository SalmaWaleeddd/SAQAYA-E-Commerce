const fs = require('fs');
const path = require('path');

const name = process.argv[2];
if (!name) {
  console.error('Please provide a component name');
  process.exit(1);
}

const pascalName = name.charAt(0).toUpperCase() + name.slice(1);
const kebabName = name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

const content = `
<template>
  <div class="${kebabName}">
  </div>
</template>

<script>
export default {
  name: '${pascalName}',
  props: {}
}
</script>

<style scoped>
.${kebabName} {}
</style>
`;

const filePath = path.join(__dirname, '..', 'src', 'components', `${pascalName}.vue`);
fs.writeFileSync(filePath, content.trim());
console.log(`Component ${pascalName}.vue created at ${filePath}`);

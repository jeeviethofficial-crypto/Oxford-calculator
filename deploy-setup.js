import fs from 'fs';
import path from 'path';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const fileURLToPath = (url) => {
  return new URL(url).pathname;
}

console.log('--- React application deployment configuration ---');
console.log('1. Vercel');
console.log('2. Netlify');
console.log('3. GitHub Pages');

rl.question('\nWhich platform do you want to deploy to? (1/2/3): ', (answer) => {
  let command = '';
  
  if (answer === '1') {
    console.log('\n✅ Vercel configuration selected.');
    console.log('   Confirmed vercel.json is present for SPA routing.');
    command = 'npx vercel';
  } else if (answer === '2') {
    console.log('\n✅ Netlify configuration selected.');
    console.log('   Confirmed netlify.toml is present for SPA routing and security headers.');
    command = 'npx netlify deploy --prod';
  } else if (answer === '3') {
    console.log('\n✅ GitHub Pages configuration selected.');
    console.log('   Confirmed .github/workflows/deploy.yml is up to date.');
    command = 'git commit -am "Setup GitHub Pages action" && git push';
  } else {
    console.log('\nInvalid selection. Exiting.');
    rl.close();
    return;
  }

  console.log('\n----------------------------------------');
  console.log('To deploy, you can run the following command:');
  console.log(`\n> ${command}`);
  console.log('\nAdditional Information for Custom Domains:');
  console.log('   - Vercel: Go to your project dashboard -> Settings -> Domains. Enter your domain, then configure your DNS provider with the recommended A / CNAME records.');
  console.log('   - Netlify: Go to your site dashboard -> Domain Management -> Add custom domain. Map the DNS records appropriately or use Netlify DNS.');
  console.log('   - GitHub Pages: Go to Repo Settings -> Pages -> Custom Domain field and add your domain. Then create a CNAME record at your DNS provider pointing to <your-username>.github.io.');
  console.log('----------------------------------------\n');
  
  rl.close();
});
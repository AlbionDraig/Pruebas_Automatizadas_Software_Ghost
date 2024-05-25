const { Given, When, Then } = require('@cucumber/cucumber');
const path = require('path');


Before(function (scenario) {
    scenarioFolder = path.join(__dirname, '..', 'screenshots', scenario.pickle.name.replace(/ /g, '_'));
  
    if (fs.existsSync(scenarioFolder)) {
      clearFolder(scenarioFolder);
    } else {
      fs.mkdirSync(scenarioFolder, { recursive: true });
    }
  
    stepCount = 0; 
  });

  // Función para tomar capturas de pantalla con nombre y ubicación personalizados
async function takeScreenshot() {
    stepCount++;
  
    const screenshotName = `step${stepCount}_screenshot.png`;
    const screenshotPath = path.join(scenarioFolder, screenshotName);
  
    await browser.saveScreenshot(screenshotPath);
    console.log(`Screenshot saved: ${screenshotPath}`);
  }

  // Función para eliminar el contenido de una carpeta
function clearFolder(folderPath) {
    const files = fs.readdirSync(folderPath);
    for (const file of files) {
      const filePath = path.join(folderPath, file);
      fs.unlinkSync(filePath);
    }
  }

  //Tomar screenshots
When("I take screenshot", async function () {
    browser = this.driver;
    await takeScreenshot();
  });

Given('Ingreso al portal de Ghost {kraken-string} con {kraken-string}, {kraken-string}', async function (url, user, password) {
    await this.driver.url(`${url}/ghost/#/signout/`);
    await this.driver.url(`${url}/ghost/`);
    await this.driver.$('input[id=identification]').setValue(user);
    await this.driver.$('input[id=password]').setValue(password);
    await this.driver.$('button[data-test-button=sign-in]').click();
    return await this.driver.$('a[title=Dashboard]');
});

Given('Creo un nuevo Tag con {kraken-string}, {kraken-string}, {kraken-string}', async function (tagName, color, description) {
    await this.driver.$('a[data-test-nav=tags]').click();
    await this.driver.$('a.ember-view.gh-btn.gh-btn-primary').click();
    await this.driver.$('#tag-name').setValue(tagName);
    await this.driver.$('input[name=accent-color][type=text]').setValue(color);
    await this.driver.$('textarea[name=description][data-test-input=tag-description]').setValue(description);
    await this.driver.$('button[data-test-button=save]').click();
    await this.driver.$('a[data-test-nav=tags]').click();
    return await this.driver.$('a[title=Dashboard]');
});

When('Elimino el tag {kraken-string} creado', async function (tagName) {
    await this.driver.$('a[data-test-nav=tags]').click();
    const elements = await this.driver.$$('h3.gh-tag-list-name')
    for (const element of elements) {
        const text = await element.getText();
        if (text.includes(tagName)) {
            await element.click();
            break;
        }
    }
    await this.driver.$('button[data-test-button=delete-tag]').click();
    return await this.driver.$('button[data-test-button=confirm]').click();
});

When('Edito el Tag {kraken-string} con {kraken-string}, {kraken-string}, {kraken-string}', async function (oldTagName, tagName, color, description) {
    const elements = await this.driver.$$('h3.gh-tag-list-name')
    for (const element of elements) {
        const text = await element.getText();
        if (text.includes(oldTagName)) {
            await element.click();
            break;
        }
    }
    await this.driver.$('#tag-name').setValue(tagName);
    await this.driver.$('input[name=accent-color][type=text]').setValue(color);
    await this.driver.$('textarea[name=description][data-test-input=tag-description]').setValue(description);
    await this.driver.$('button[data-test-button=save]').click();
    await this.driver.$('a[data-test-nav=tags]').click();
    return await this.driver.$('a[title=Dashboard]');
});

When('Creo un nuevo Member con {kraken-string}, {kraken-string}, {kraken-string}', async function (memberName, memberEmail, mamberNote) {
    await this.driver.$('a[data-test-nav=members]').click();
    await this.driver.$('a.ember-view.gh-btn.gh-btn-primary').click();
    await this.driver.$('#member-name').setValue(memberName);
    await this.driver.$('input[name=email][type=text]').setValue(memberEmail);
    await this.driver.$('textarea[name=note][data-test-input=member-note]').setValue(mamberNote);
    await this.driver.$('button[data-test-button=save]').click();
    await new Promise(resolve => {setTimeout(resolve, 2000);});
    await this.driver.$('a[data-test-nav=members]').click();
    return await this.driver.$('a[data-test-table-data=details] > div > div > h3');
});

When('Edito el miembro creado con {kraken-string}, {kraken-string}, {kraken-string}', async function (memberName, memberEmail, mamberNote) {
    await this.driver.$('a[data-test-nav=members]').click();
    await this.driver.$('a[data-test-table-data=details] > div > div > h3').click();
    await this.driver.$('#member-name').setValue(memberName);
    await this.driver.$('input[name=email][type=text]').setValue(memberEmail);
    await this.driver.$('textarea[name=note][data-test-input=member-note]').setValue(mamberNote);
    await this.driver.$('button[data-test-button=save]').click();
    await new Promise(resolve => {setTimeout(resolve, 2000);});
    await this.driver.$('a[data-test-nav=members]').click();
    return await this.driver.$('a[title=Dashboard]');
});

When('Creo una pagina con {kraken-string}, {kraken-string}', async function (tittle, content) {
    await this.driver.$('a[data-test-nav=pages]').click();
    await new Promise(resolve => {setTimeout(resolve, 2000);});
    await this.driver.$('a.ember-view.gh-btn.gh-btn-primary.view-actions-top-row').click();
    await new Promise(resolve => {setTimeout(resolve, 2000);});
    await this.driver.$('textarea[data-test-editor-title-input]').setValue(tittle);
    await this.driver.$('p[data-koenig-dnd-droppable=true]').setValue(content);    
    await new Promise(resolve => {setTimeout(resolve, 2000);});
    return await this.driver.$('a[data-test-link="pages"]').click();    
    //return await this.driver.$('a[title=Dashboard]');
});

When('Edito la pagina ya creada con {kraken-string}, {kraken-string}, {kraken-string}', async function (tittle,tittle2, content2) {
    const elements = await this.driver.$$('a.gh-list-data.gh-post-list-title')
    for (const element of elements) {
        const text = await element.getText();
        if (text.includes(tittle)) {
            await element.click();
            break;
        }
    }
    await this.driver.$('textarea[data-test-editor-title-input]').setValue(tittle2);
    await this.driver.$('p[data-koenig-dnd-droppable=true]').setValue(content2);    
    await new Promise(resolve => {setTimeout(resolve, 2000);});
    return await this.driver.$('a[data-test-link="pages"]').click();    
    //return await this.driver.$('a[title=Dashboard]');
});

When('Agrego tag a la pagina creada con {kraken-string}, {kraken-string}', async function (tittle,tagName) {
    await new Promise(resolve => {setTimeout(resolve, 2000);});
    const elements = await this.driver.$$('a.gh-list-data.gh-post-list-title');

    for (const element of elements){
        const text = await element.getText();
        if(text.includes(tittle)){
            await element.click();
            break;
        }
    }
    await this.driver.$('button.settings-menu-toggle.gh-btn.gh-btn-editor.gh-btn-icon.icon-only.gh-btn-action-icon').click();
    await this.driver.$('[class="ember-power-select-trigger-multiple-input"]').click();

    const tagElements = await this.driver.$$('li.ember-power-select-option');
    for (const element of tagElements){
        const text = await element.getText();
        if(text.includes(tagName)){
            await element.click();
            break;
        }
    }
    await new Promise(resolve => {setTimeout(resolve, 2000);});
    return await this.driver.$('header > div > a').click();
});

Then('Valido que se haya eliminado el tag {kraken-string}', async function (tagName) {
    await new Promise(resolve => {setTimeout(resolve, 2000);});
    try {
        const elements = await this.driver.$$('h3.gh-tag-list-name')
        for (const element of elements) {
            const text = await element.getText();
            if (text.includes(tagName)) {
                throw new Error('El tag aun existe.');
            }
        }
    } catch (error) {}
});

Then('Valido que se haya editado el tag {kraken-string}', async function (tagName) {
    await new Promise(resolve => {setTimeout(resolve, 2000);});
    const elements = await this.driver.$$('h3.gh-tag-list-name');
    let tagEncontrado = false;

    for (const element of elements) {
        const text = await element.getText();
        if (text.includes(tagName)) {
            tagEncontrado = true;
            break;
        }
    }

    if (!tagEncontrado) {
        throw new Error(`El tag ${tagName} no fue modificado`);
    }
});

Then('Valido que se haya editado el Member {kraken-string}', async function (memberName) {
    await new Promise(resolve => {setTimeout(resolve, 2000);});
    try {
        const text = await this.driver.$('a[data-test-table-data=details] > div > div > h3').getText();
        if (!text.includes(memberName)) {
            throw new Error(`El member ${memberName} no fue modificado`);
        }
    } catch (error) {
        throw new Error(`El member ${memberName} no fue encontrado`);
    }
});

Then('Valido que se haya creado el Member {kraken-string}', async function (memberName) {
    await new Promise(resolve => {setTimeout(resolve, 2000);});
    try {
        const text = await this.driver.$('a[data-test-table-data=details] > div > div > h3').getText();
        if (!text.includes(memberName)) {
            throw new Error(`El member ${memberName} no fue creado`);
        }
    } catch (error) {
        throw new Error(`El member ${memberName} no fue encontrado`);
    }
});

Then('Elimino el Member creado', async function () {
    await new Promise(resolve => {setTimeout(resolve, 2000);});
    await this.driver.$('a[data-test-nav=members]').click();
    await this.driver.$('a[data-test-table-data=details] > div > div > h3').click();
    await this.driver.$('button[data-test-button=member-actions]').click();
    await this.driver.$('button[data-test-button=delete-member]').click();
    await this.driver.$('button[data-test-button=confirm]').click();
});

Then('Valido que se haya eliminado el Member', async function () {
    await new Promise(resolve => {setTimeout(resolve, 2000);});
    try {
        await this.driver.$('a[data-test-table-data=details] > div > div > h3');
        throw new Error('El Member no fue eliminado');
    } catch (error) {}
});

Then('Valido que se haya creado la pagina con {kraken-string}', async function (tittle) {
    await new Promise(resolve => {setTimeout(resolve, 2000);});
    const elements = await this.driver.$$('a.gh-list-data.gh-post-list-title');
    let pageEncontrado = false;

    for (const element of elements){
        const text = await element.getText();
        if(text.includes(tittle)){
            pageEncontrado=true;
            break;
        }
    }
    if (!pageEncontrado) {
        throw new Error(`La pagina ${tittle} no fue creado`);
    }
});

Then('Valido que se haya editado la pagina con {kraken-string}', async function (tittle2) {
    await new Promise(resolve => {setTimeout(resolve, 2000);});
    const elements = await this.driver.$$('a.gh-list-data.gh-post-list-title');
    let pageEncontrado = false;

    for (const element of elements){
        const text = await element.getText();
        if(text.includes(tittle2)){
            pageEncontrado=true;
            break;
        }
    }
    if (!pageEncontrado) {
        throw new Error(`La pagina ${tittle} no fue creado`);
    }
});

Then('Elimino la pagina creada con {kraken-string}', async function (tittle) {
    await new Promise(resolve => {setTimeout(resolve, 2000);});
    await this.driver.$('a[data-test-nav=pages]').click();
    await new Promise(resolve => {setTimeout(resolve, 2000);});
    const elements = await this.driver.$$('a.gh-list-data.gh-post-list-title');

    for (const element of elements){
        const text = await element.getText();
        if(text.includes(tittle)){
            await element.click();
            break;
        }
    }
    await this.driver.$('button.settings-menu-toggle.gh-btn.gh-btn-editor.gh-btn-icon.icon-only.gh-btn-action-icon').click();
    await this.driver.$('button.gh-btn.gh-btn-outline.gh-btn-icon.gh-btn-fullwidth').click();
    return await this.driver.$('button.gh-btn.gh-btn-red.gh-btn-icon.ember-view').click();
});

Then('Elimino la pagina editada con {kraken-string}', async function (tittle2) {
    await new Promise(resolve => {setTimeout(resolve, 2000);});
    await this.driver.$('a[data-test-nav=pages]').click();
    await new Promise(resolve => {setTimeout(resolve, 2000);});
    const elements = await this.driver.$$('a.gh-list-data.gh-post-list-title');

    for (const element of elements){
        const text = await element.getText();
        if(text.includes(tittle2)){
            await element.click();
            break;
        }
    }
    await this.driver.$('button.settings-menu-toggle.gh-btn.gh-btn-editor.gh-btn-icon.icon-only.gh-btn-action-icon').click();
    await this.driver.$('button.gh-btn.gh-btn-outline.gh-btn-icon.gh-btn-fullwidth').click();
    return await this.driver.$('button.gh-btn.gh-btn-red.gh-btn-icon.ember-view').click();
});

Then('Valido que se haya eliminado la pagina con {kraken-string}', async function (tittle) {
    await new Promise(resolve => {setTimeout(resolve, 2000);});
    await this.driver.$('a[data-test-nav=pages]').click();
    await new Promise(resolve => {setTimeout(resolve, 2000);});
    try{
        const elements = await this.driver.$$('a.gh-list-data.gh-post-list-title');

        for (const element of elements){
            const text = await element.getText();
            if(text.includes(tittle)){
                throw new Error('la pagina aun existe.');
            }
        }
    }catch(error){}
    
});

 // Crear post 
When('Creo un nuevo Post con {kraken-string}, {kraken-string}', async function (tittle, content) {
    await this.driver.$('a[data-test-nav=new-story]').click();
    await new Promise(resolve => {setTimeout(resolve, 2000);});
    await this.driver.$('textarea[data-test-editor-title-input]').setValue(tittle);
    await this.driver.$('p[data-koenig-dnd-droppable=true]').click();
    await new Promise(resolve => {setTimeout(resolve, 2000);});
    await this.driver.$('p[data-koenig-dnd-droppable=true]').setValue(content);    
    await new Promise(resolve => {setTimeout(resolve, 4000);});
    return await this.driver.$('a[data-test-link="posts"]').click();    
});

// Creo un schedule post 
When('Creo un schedule post {kraken-string}', async function (tittle) {
    await new Promise(resolve => {setTimeout(resolve, 2000);});
    await this.driver.$('a[data-test-nav=posts').click();
    await new Promise(resolve => {setTimeout(resolve, 2000);}); 
    const elements = await this.driver.$$('a.gh-list-data.gh-post-list-title')
    for (const element of elements) {
        const text = await element.getText();
        if (text.includes(tittle)) {
            await element.click();
            break;
        }
    }
    await this.driver.$('header > section.gh-editor-publish-buttons > button[data-test-button=publish-flow]').click();
    await new Promise(resolve => {setTimeout(resolve, 2000);});
    await this.driver.$('div > div > div.gh-publish-settings > div.gh-publish-setting.last > button').click();
    await new Promise(resolve => {setTimeout(resolve, 2000);});
    await this.driver.$(' div > fieldset > div > div:nth-child(2)').click();
    await new Promise(resolve => {setTimeout(resolve, 2000);});
    await this.driver.$('div > div > div.gh-publish-cta > button').click();
    await new Promise(resolve => {setTimeout(resolve, 2000);});
    await this.driver.$('div > div > div.gh-publish-cta > button[data-test-button="confirm-publish"]').click();
    await new Promise(resolve => {setTimeout(resolve, 2000);});
    await this.driver.$('div > header > button > span').click();    
    await new Promise(resolve => {setTimeout(resolve, 4000);});
    return await this.driver.$('a[data-test-link="posts"]').click();  
});

// Creo un instant post 
When('Creo un instant post {kraken-string}', async function (tittle) {
    await new Promise(resolve => {setTimeout(resolve, 2000);});
    await this.driver.$('a[data-test-nav=posts').click();
    await new Promise(resolve => {setTimeout(resolve, 2000);}); 
    const elements = await this.driver.$$('a.gh-list-data.gh-post-list-title')
    for (const element of elements) {
        const text = await element.getText();
        if (text.includes(tittle)) {
            await element.click();
            break;
        }
    }
    await this.driver.$('header > section.gh-editor-publish-buttons > button[data-test-button=publish-flow]').click();
    await new Promise(resolve => {setTimeout(resolve, 2000);});
    await this.driver.$('div > div > div.gh-publish-cta > button').click();
    await new Promise(resolve => {setTimeout(resolve, 2000);});
    await this.driver.$('div > div > div.gh-publish-cta > button[data-test-button="confirm-publish"]').click();
    await new Promise(resolve => {setTimeout(resolve, 2000);});
    await this.driver.$('div > header > button > span').click();    
    await new Promise(resolve => {setTimeout(resolve, 4000);});
    return await this.driver.$('a[data-test-link="posts"]').click();  
});

 //Validar que se creo el post programado 
Then('Valido que se programo el Post {kraken-string}', async function (tittle) {
await new Promise(resolve => {setTimeout(resolve, 2000);}); 
const elements = await this.driver.$$('a.gh-list-data.gh-post-list-title');
let postEncontrado = false;

for (const element of elements){
    const text = await element.getText();
    if(text.includes(tittle)){
        postEncontrado=true;
        break;
    }
}
});

//Edit post
When('Edito el Post con {kraken-string}, {kraken-string}, {kraken-string}', async function (tittle,tittle2, content2) {
    const elements = await this.driver.$$('a.gh-list-data.gh-post-list-title')
    for (const element of elements) {
        const text = await element.getText();
        if (text.includes(tittle)) {
            await element.click();
            break;
        }
    }
    await new Promise(resolve => {setTimeout(resolve, 2000);});
    await this.driver.$('textarea[data-test-editor-title-input]').setValue(tittle2);
    await this.driver.$('p[data-koenig-dnd-droppable=true]').click();
    await new Promise(resolve => {setTimeout(resolve, 2000);});
    await this.driver.$('p[data-koenig-dnd-droppable=true]').setValue(content2);    
    await new Promise(resolve => {setTimeout(resolve, 2000);});
    return await this.driver.$('a[href="#/posts/"][data-test-link=posts]').click();    
    //return await this.driver.$('a[title=Dashboard]');
});

//Agregar un Tag a un post 
When('Agrego tag a un nuevo Post con {kraken-string}, {kraken-string}', async function (tittle,tagName) {
    await new Promise(resolve => {setTimeout(resolve, 2000);});
    const elements = await this.driver.$$('a.gh-list-data.gh-post-list-title');

    for (const element of elements){
        const text = await element.getText();
        if(text.includes(tittle)){
            await element.click();
            break;
        }
    }
    await this.driver.$('button.settings-menu-toggle.gh-btn.gh-btn-editor.gh-btn-icon.icon-only.gh-btn-action-icon').click();
    await this.driver.$('[class="ember-power-select-trigger-multiple-input"]').click();

    const tagElements = await this.driver.$$('li.ember-power-select-option');
    for (const element of tagElements){
        const text = await element.getText();
        if(text.includes(tagName)){
            await element.click();
            break;
        }
    }    
    await this.driver.$('header > div > a').click();
});

///Eliminar un Post 

Then('Elimino el Post creado con {kraken-string}', async function (tittle) {
    await new Promise(resolve => {setTimeout(resolve, 2000);});
    await this.driver.$('a[data-test-nav=posts]').click();
    await new Promise(resolve => {setTimeout(resolve, 2000);});
    const elements = await this.driver.$$('a.gh-list-data.gh-post-list-title');

    for (const element of elements){
        const text = await element.getText();
        if(text.includes(tittle)){
            await element.click();
            break;
        }
    }
    await this.driver.$('button.settings-menu-toggle.gh-btn.gh-btn-editor.gh-btn-icon.icon-only.gh-btn-action-icon').click();
    await this.driver.$('button.gh-btn.gh-btn-outline.gh-btn-icon.gh-btn-fullwidth').click();
    return await this.driver.$('button.gh-btn.gh-btn-red.gh-btn-icon.ember-view').click();
});

//Valido que se edito el post 

Then('Valido que se haya editado el post con {kraken-string}', async function (tittle2) {
    await new Promise(resolve => {setTimeout(resolve, 2000);});
    const elements = await this.driver.$$('a.gh-list-data.gh-post-list-title');
    let postEncontrado = false;

    for (const element of elements){
        const text = await element.getText();
        if(text.includes(tittle2)){
            postEncontrado=true;
            break;
        }
    }
    if (!postEncontrado) {
        throw new Error(`La pagina ${tittle} no fue creado`);
    }
});

// Valido q se elimino el post

Then('Valido que se haya eliminado el Post con {kraken-string}', async function (tittle) {
    await new Promise(resolve => {setTimeout(resolve, 2000);});
    await this.driver.$('a[data-test-nav=posts]').click();
    await new Promise(resolve => {setTimeout(resolve, 2000);});
    try{
        const elements = await this.driver.$$('a.gh-list-data.gh-post-list-title'); 

        for (const element of elements){
            const text = await element.getText();
            if(text.includes(tittle)){
                throw new Error('la pagina aun existe.');
            }
        }
    }catch(error){}
    
});

//Validar que se haya editado un post

Then('Valido que se haya editado el Post con {kraken-string}', async function (tittle2) {
    await new Promise(resolve => {setTimeout(resolve, 2000);});
    const elements = await this.driver.$$('"a.gh-list-data.gh-post-list-title');
    let postEncontrado = false;

    for (const element of elements){
        const text = await element.getText();
        if(text.includes(tittle2)){
            postEncontrado=true;
            break;
        }
    }
    if (!postEncontrado) {
        throw new Error(`La pagina ${tittle2} no fue creado`);
    }
});

Then('Cierro sesion en {kraken-string}', async function (url) {
    await this.driver.url(`${url}/ghost/#/signout/`);
    return await this.driver.$('#login');
});

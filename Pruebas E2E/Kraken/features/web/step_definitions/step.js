const { Given, When, Then } = require('@cucumber/cucumber');

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

When('Elimino el tag creado', async function () {
    await this.driver.$('a[data-test-nav=tags]').click();
    await this.driver.$('ol.tags-list li.gh-list-row.gh-tags-list-item:nth-of-type(3)').click();
    await this.driver.$('button[data-test-button=delete-tag]').click();
    return await this.driver.$('button[data-test-button=confirm]').click();
});

When('Edito el Tag con {kraken-string}, {kraken-string}, {kraken-string}', async function (tagName, color, description) {
    await this.driver.$('ol.tags-list li.gh-list-row.gh-tags-list-item:nth-of-type(3)').click();
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

Then('Valido que se haya eliminado el tag', async function () {
    await new Promise(resolve => {setTimeout(resolve, 2000);});
    try {
        await this.driver.$('ol.tags-list li.gh-list-row.gh-tags-list-item:nth-of-type(3)');
        throw new Error('El tag aun existe.');
    } catch (error) {}
});

Then('Valido que se haya editado el tag {kraken-string}', async function (tagName) {
    await new Promise(resolve => {setTimeout(resolve, 2000);});
    try {
        const text = await this.driver.$('ol.tags-list li.gh-list-row.gh-tags-list-item:nth-of-type(3)').getText();
        if (!text.includes(tagName)) {
            throw new Error(`El tag ${tagName} no fue modificado`);
        }
    } catch (error) {
        throw new Error(`El tag ${tagName} no fue encontrado`);
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

Then('Cierro sesion en {kraken-string}', async function (url) {
    await this.driver.url(`${url}/ghost/#/signout/`);
    return await this.driver.$('#login');
});
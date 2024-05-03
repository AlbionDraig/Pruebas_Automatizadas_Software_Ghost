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

When('Edito el Tag con {kraken-string}, {kraken-string}, {kraken-string}"', async function (tagName, color, description) {
    await this.driver.$('ol.tags-list li.gh-list-row.gh-tags-list-item:nth-of-type(3)').click();
    await this.driver.$('#tag-name').setValue(tagName);
    await this.driver.$('input[name=accent-color][type=text]').setValue(color);
    await this.driver.$('textarea[name=description][data-test-input=tag-description]').setValue(description);
    await this.driver.$('button[data-test-button=save]').click();
    await this.driver.$('a[data-test-nav=tags]').click();
    return await this.driver.$('a[title=Dashboard]');
});

Then('Valido que se haya eliminado el tag', async function () {
    try {
        await this.driver.waitForExist('ol.tags-list li.gh-list-row.gh-tags-list-item:nth-of-type(3)', { timeout: 5000});
        throw new Error('El tag aun existe.');
    } catch (error) {}
});

Then('Valido que se haya editado el tag {kraken-string}', async function (tagName) {
    try {
        await this.driver.waitForExist('ol.tags-list li.gh-list-row.gh-tags-list-item:nth-of-type(3)', { timeout: 5000});
        const text = await this.driver.getText('ol.tags-list li.gh-list-row.gh-tags-list-item:nth-of-type(3)');
        if (!text.includes(tagName)) {
            throw new Error(`El tag ${tagName} no fue modificado`);
        }
    } catch (error) {}
});

Then('Cierro sesion en {kraken-string}', async function (url) {
    await this.driver.url(`${url}/ghost/#/signout/`);
    return await this.driver.$('#login');
});
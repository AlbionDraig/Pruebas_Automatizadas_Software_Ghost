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

When('Hago click en el tag creado', async function () {
    await this.driver.$('a[data-test-nav=tags]').click();
    return await this.driver.$('ol.tags-list li.gh-list-row.gh-tags-list-item:nth-of-type(3)').click();
});

When('Hago click en eliminar', async function () {
    return await this.driver.$('button[data-test-button=delete-tag]').click();
});

When('Confirmo la eliminacion', async function () {
    return await this.driver.$('button[data-test-button=confirm]').click();
});

Then('valido que se haya eliminado el tag', async function () {
    try {
        await this.driver.waitForExist('ol.tags-list li.gh-list-row.gh-tags-list-item:nth-of-type(3)', { timeout: 5000});
        throw new Error('El tag aun existe.');
    } catch (error) {}
});

Then('Cierro sesion en {kraken-string}', async function (url) {
    await this.driver.url(`${url}/ghost/#/signout/`);
    return await this.driver.$('#login');
});
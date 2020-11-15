describe('Blog Post', () => {
    it('should be able to create a new blog post', () => {
        cy.visit('/');
        cy.contains('Vanilla JS Blog').should('be.visible');

        cy.wait(1000);
        cy.get('button').contains('Créer').should('be.visible');
        cy.get('button').contains('Créer').click();

        cy.get('input#title-input').type('Article de test');
        cy.get('input#author-input').type('Auteur anonyme');
        cy.get('textarea#body-input').type(
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras interdum mollis bibendum. Phasellus consequat non neque eu euismod. Vestibulum elementum, magna sed dictum accumsan, leo ex laoreet nunc, sed finibus ligula mi vitae est.'
        );

        cy.get('button').contains('Publier').click();

        cy.get('li').contains('Article de test').should('be.visible');
    });

    it('should be able to display the post details', () => {
        cy.visit('/');
        cy.contains('Vanilla JS Blog').should('be.visible');

        cy.wait(1000);
        cy.get('li').contains('Article de test').should('be.visible');
        cy.get('li').contains('Article de test').click();

        cy.get('h3').contains('Article de test').should('be.visible');
        cy.get('p').contains('Lorem ipsum dolor sit amet').should('be.visible');
    });
});

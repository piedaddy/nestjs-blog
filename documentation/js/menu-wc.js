'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nestjs-intro documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-d38144bad8c95d8acd0bcb44896a0a67ea1bffa90efcd7a87071d51358eac35c210c94825fe5fd8397c41e6ee477b6c9cf08f794b6636ac61905dafe543d32b4"' : 'data-bs-target="#xs-controllers-links-module-AppModule-d38144bad8c95d8acd0bcb44896a0a67ea1bffa90efcd7a87071d51358eac35c210c94825fe5fd8397c41e6ee477b6c9cf08f794b6636ac61905dafe543d32b4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-d38144bad8c95d8acd0bcb44896a0a67ea1bffa90efcd7a87071d51358eac35c210c94825fe5fd8397c41e6ee477b6c9cf08f794b6636ac61905dafe543d32b4"' :
                                            'id="xs-controllers-links-module-AppModule-d38144bad8c95d8acd0bcb44896a0a67ea1bffa90efcd7a87071d51358eac35c210c94825fe5fd8397c41e6ee477b6c9cf08f794b6636ac61905dafe543d32b4"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-d38144bad8c95d8acd0bcb44896a0a67ea1bffa90efcd7a87071d51358eac35c210c94825fe5fd8397c41e6ee477b6c9cf08f794b6636ac61905dafe543d32b4"' : 'data-bs-target="#xs-injectables-links-module-AppModule-d38144bad8c95d8acd0bcb44896a0a67ea1bffa90efcd7a87071d51358eac35c210c94825fe5fd8397c41e6ee477b6c9cf08f794b6636ac61905dafe543d32b4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-d38144bad8c95d8acd0bcb44896a0a67ea1bffa90efcd7a87071d51358eac35c210c94825fe5fd8397c41e6ee477b6c9cf08f794b6636ac61905dafe543d32b4"' :
                                        'id="xs-injectables-links-module-AppModule-d38144bad8c95d8acd0bcb44896a0a67ea1bffa90efcd7a87071d51358eac35c210c94825fe5fd8397c41e6ee477b6c9cf08f794b6636ac61905dafe543d32b4"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-c0cb5e375dc5714a4e931d28ebabe99d5f5a6a8ded21594375e0754d6717f7933d8b6a1aebc9a129b35ec3085620707d74265282bb1f678dbdb7b2fbfa2b8c63"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-c0cb5e375dc5714a4e931d28ebabe99d5f5a6a8ded21594375e0754d6717f7933d8b6a1aebc9a129b35ec3085620707d74265282bb1f678dbdb7b2fbfa2b8c63"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-c0cb5e375dc5714a4e931d28ebabe99d5f5a6a8ded21594375e0754d6717f7933d8b6a1aebc9a129b35ec3085620707d74265282bb1f678dbdb7b2fbfa2b8c63"' :
                                            'id="xs-controllers-links-module-AuthModule-c0cb5e375dc5714a4e931d28ebabe99d5f5a6a8ded21594375e0754d6717f7933d8b6a1aebc9a129b35ec3085620707d74265282bb1f678dbdb7b2fbfa2b8c63"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-c0cb5e375dc5714a4e931d28ebabe99d5f5a6a8ded21594375e0754d6717f7933d8b6a1aebc9a129b35ec3085620707d74265282bb1f678dbdb7b2fbfa2b8c63"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-c0cb5e375dc5714a4e931d28ebabe99d5f5a6a8ded21594375e0754d6717f7933d8b6a1aebc9a129b35ec3085620707d74265282bb1f678dbdb7b2fbfa2b8c63"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-c0cb5e375dc5714a4e931d28ebabe99d5f5a6a8ded21594375e0754d6717f7933d8b6a1aebc9a129b35ec3085620707d74265282bb1f678dbdb7b2fbfa2b8c63"' :
                                        'id="xs-injectables-links-module-AuthModule-c0cb5e375dc5714a4e931d28ebabe99d5f5a6a8ded21594375e0754d6717f7933d8b6a1aebc9a129b35ec3085620707d74265282bb1f678dbdb7b2fbfa2b8c63"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostsModule.html" data-type="entity-link" >PostsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PostsModule-9428901fac7b34e0845307b14c782c44f80158498e874f63128a96819e9acec76f040ae22708b8ad1c63dc06f9dd01b7b9371c5ecb515d39c33fdac33a85cdf0"' : 'data-bs-target="#xs-controllers-links-module-PostsModule-9428901fac7b34e0845307b14c782c44f80158498e874f63128a96819e9acec76f040ae22708b8ad1c63dc06f9dd01b7b9371c5ecb515d39c33fdac33a85cdf0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostsModule-9428901fac7b34e0845307b14c782c44f80158498e874f63128a96819e9acec76f040ae22708b8ad1c63dc06f9dd01b7b9371c5ecb515d39c33fdac33a85cdf0"' :
                                            'id="xs-controllers-links-module-PostsModule-9428901fac7b34e0845307b14c782c44f80158498e874f63128a96819e9acec76f040ae22708b8ad1c63dc06f9dd01b7b9371c5ecb515d39c33fdac33a85cdf0"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostsModule-9428901fac7b34e0845307b14c782c44f80158498e874f63128a96819e9acec76f040ae22708b8ad1c63dc06f9dd01b7b9371c5ecb515d39c33fdac33a85cdf0"' : 'data-bs-target="#xs-injectables-links-module-PostsModule-9428901fac7b34e0845307b14c782c44f80158498e874f63128a96819e9acec76f040ae22708b8ad1c63dc06f9dd01b7b9371c5ecb515d39c33fdac33a85cdf0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostsModule-9428901fac7b34e0845307b14c782c44f80158498e874f63128a96819e9acec76f040ae22708b8ad1c63dc06f9dd01b7b9371c5ecb515d39c33fdac33a85cdf0"' :
                                        'id="xs-injectables-links-module-PostsModule-9428901fac7b34e0845307b14c782c44f80158498e874f63128a96819e9acec76f040ae22708b8ad1c63dc06f9dd01b7b9371c5ecb515d39c33fdac33a85cdf0"' }>
                                        <li class="link">
                                            <a href="injectables/PostsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-36c33340ec77222e8f61bdec25eb01331c1a8875e1dbc0ec5f9c6e2bd688ba0c4d1094de1642474f27a1be5c7f99ff7d1950bf9540ac8582061971d5ac828acc"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-36c33340ec77222e8f61bdec25eb01331c1a8875e1dbc0ec5f9c6e2bd688ba0c4d1094de1642474f27a1be5c7f99ff7d1950bf9540ac8582061971d5ac828acc"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-36c33340ec77222e8f61bdec25eb01331c1a8875e1dbc0ec5f9c6e2bd688ba0c4d1094de1642474f27a1be5c7f99ff7d1950bf9540ac8582061971d5ac828acc"' :
                                            'id="xs-controllers-links-module-UsersModule-36c33340ec77222e8f61bdec25eb01331c1a8875e1dbc0ec5f9c6e2bd688ba0c4d1094de1642474f27a1be5c7f99ff7d1950bf9540ac8582061971d5ac828acc"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-36c33340ec77222e8f61bdec25eb01331c1a8875e1dbc0ec5f9c6e2bd688ba0c4d1094de1642474f27a1be5c7f99ff7d1950bf9540ac8582061971d5ac828acc"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-36c33340ec77222e8f61bdec25eb01331c1a8875e1dbc0ec5f9c6e2bd688ba0c4d1094de1642474f27a1be5c7f99ff7d1950bf9540ac8582061971d5ac828acc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-36c33340ec77222e8f61bdec25eb01331c1a8875e1dbc0ec5f9c6e2bd688ba0c4d1094de1642474f27a1be5c7f99ff7d1950bf9540ac8582061971d5ac828acc"' :
                                        'id="xs-injectables-links-module-UsersModule-36c33340ec77222e8f61bdec25eb01331c1a8875e1dbc0ec5f9c6e2bd688ba0c4d1094de1642474f27a1be5c7f99ff7d1950bf9540ac8582061971d5ac828acc"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreatePostDto.html" data-type="entity-link" >CreatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePostMetaOptionsDto.html" data-type="entity-link" >CreatePostMetaOptionsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUsersParamDto.html" data-type="entity-link" >GetUsersParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchPostDto.html" data-type="entity-link" >PatchPostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDto.html" data-type="entity-link" >PatchUserDto</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});
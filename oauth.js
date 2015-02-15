var ids = {
facebook: {
 clientID: '1545361402397818',
 clientSecret: '4239fd3261753f60dc7f16f364efedc7',
 callbackURL: 'http://127.0.0.1:1337/auth/facebook/callback'
},
nuwe: {
 clientID: '5d2b3255fc3d261ebd138f04d6b290b5bb9203c06ff157ec8c02e0621af66a65',
 clientSecret: '242b2d63038c985d9487eccd66c6ee16812104a28dceb8d58885a1a4ed59c40f',
 callbackURL: 'http://127.0.0.1:1337/auth/nuwe/callback'
},
twitter: {
 consumerKey: 'get_your_own',
 consumerSecret: 'get_your_own',
 callbackURL: "http://127.0.0.1:1337/auth/twitter/callback"
},
github: {
 clientID: 'a03a944eaa1538ddcfb6',
 clientSecret: '0c4f4574dd5488c359df0ffbc3f5ea95c699d21a',
 callbackURL: "http://127.0.0.1:1337/auth/github/callback"
},
google: {
 returnURL: 'http://127.0.0.1:1337/auth/google/callback',
 realm: 'http://127.0.0.1:1337'
}
}

module.exports = ids
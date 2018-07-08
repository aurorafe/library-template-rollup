## library-template-rollup

### use

This is a project template for [sakitam-cli](https://github.com/sakitam-fdd/sakitam-cli).
 It is recommended to use npm 3+ for a more efficient dependency tree.

```bash
$ npm install -g sakitam-cli
// list available templete
$ sakitam list
// generate project
$ sakitam init library-template-rollup my-project
$ cd my-project
$ npm install
$ npm run dev
```

### options

| filed | params | desc |
| :--- | :--- | :---------- |
| `name` | `String` | package name |
| `homepage` | `String` | the project homepage |
| `namespace` | `String` | The lib namespace。 |
| `version` | `String` | The package version |
| `description` | `String` | The project description |
| `Author` | `String` | The project author |
| `scss` | `choices` | Use scss for your style code? |
| `ESLint` | `choices` | Use ESLint to lint your code? |
| `autoInstall` | `choices` | Should we run `npm install` for you after the project has been created?  |


Fork It And Make Your Own
You can fork this repo to create your own boilerplate, and use it with sakitam-cli:

```bash
sakitam init username/repo my-project
```

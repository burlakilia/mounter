Mounter
=======

Mount to your project some sub projects from git, and prepare this sub project for using.

Install
=======

`
    npm install -g mounter
`

Using
=======

   mounter update

Commands
=======

*  update - clone components repo from git endpoint
*  build - run build section in components directory
*  cleanup - run cleanup section in components directory

Options
=======
* --prefix - path to which all actions will be executed
* --config - alternative path to `mounter.json`

Configuration
=======
Add `mounter.json` into your project folder. This config defines several options:

* path - relative or absolute path to component folder
* endpoint - uri to git project, where "<repoType>[-<protocol>]://<uri to repo>#<version, you can use semver notation like >0.0.1 or 0.0.x>"
* build - array of commands which execute in component folder
* cleanup - array of commands which execute in component folder


   {
     "jquery": {
            "path": "./test/misc/dist/app/modules",
            "endpoint": "git-https://github.com/jquery/jquery.git#1.9.x",
            "build": [
                "npm run build",
                "grunt"
            ]
            "cleanup": [
                "rmdir /s/q .git"
            ]
     }
  }

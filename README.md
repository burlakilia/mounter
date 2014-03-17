mounter
=======

Mount to your git project, some sub projects.

install
=======

`
    npm install -g mounter
`


configuration
=======


    {
        "jquery": {
            "path": "./test/misc/dist/app/modules",
            "endpoint": "git-https://github.com/jquery/jquery.git#1.9.x",
            "cleanup": [
                "rmdir /s/q .git"
            ]
        }
    }


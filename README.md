# to-do-api-
using express


#post
http://localhost:3000/todo/
{
	"title":"git repo",
	"description":"make git repo and submit"
}
#output
{
    "_id": "60d15acf7f2b54032c21e4fd",
    "title": "git repo",
    "description": "make git repo and submit",
    "writtenDate": "2021-06-22T03:36:47.577Z",
    "__v": 0
}


#get for all data
http://localhost:3000/todo/
#output
[
    {
        "_id": "60d147608c628d0674a51ac5",
        "title": "patch correction",
        "description": "using post man  ",
        "writtenDate": "2021-06-22T02:13:52.223Z",
        "__v": 0
    },
    {
        "_id": "60d15ab37f2b54032c21e4fb",
        "title": "patch",
        "description": "corrected",
        "writtenDate": "2021-06-22T03:36:19.332Z",
        "__v": 0
    },
    {
        "_id": "60d15acf7f2b54032c21e4fd",
        "title": "git repo",
        "description": "make git repo and submit",
        "writtenDate": "2021-06-22T03:36:47.577Z",
        "__v": 0
    }
]


#get for one
http://localhost:3000/todo/60d15acf7f2b54032c21e4fd
#output
{
    "_id": "60d15acf7f2b54032c21e4fd",
    "title": "git repo",
    "description": "make git repo and submit",
    "writtenDate": "2021-06-22T03:36:47.577Z",
    "__v": 0
}


#patch
http://localhost:3000/todo/60d15acf7f2b54032c21e4fd
{
	"title":"patching the title",
	"description":"update the data"
}

#output
{
    "_id": "60d15acf7f2b54032c21e4fd",
    "title": "patching the title",
    "description": "update the data",
    "writtenDate": "2021-06-22T03:36:47.577Z",
    "__v": 0
}

#delete
http://localhost:3000/todo/60d15ab37f2b54032c21e4fb

#output
{
    "message": "message deleted"
}


#remaining data
#get all data
http://localhost:3000/todo/

#output
[
    {
        "_id": "60d147608c628d0674a51ac5",
        "title": "git repo",
        "description": "make git repo and submit",
        "writtenDate": "2021-06-22T02:13:52.223Z",
        "__v": 0
    },
    {
        "_id": "60d15acf7f2b54032c21e4fd",
        "title": "patching the title",
        "description": "update the data",
        "writtenDate": "2021-06-22T03:36:47.577Z",
        "__v": 0
    }
]



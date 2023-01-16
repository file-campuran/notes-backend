const { addNoteHandler, getAllNotesHandler, getNotesByIdHandler, editNoteByIdHandler, deleteNotesByIdHandler } = require("./handler");

 const routes = [
    {
        method : 'POST',
        path: '/notes',
        handler: addNoteHandler,
        // option:{
        //     cors: {
        //         origin: ['*']
        //     }
        // }
    },

    {
        method : 'GET',
        path : '/notes',
        handler: getAllNotesHandler,
    },
    {
        method : 'GET',
        path : '/notes/{id}',
        handler: getNotesByIdHandler,
    },
    {
        method : 'PUT',
        path : '/notes/{id}',
        handler: editNoteByIdHandler,
    },
    {
        method : 'DELETE',
        path : '/notes/{id}',
        handler: deleteNotesByIdHandler,
    },

 ];


module.exports = routes;
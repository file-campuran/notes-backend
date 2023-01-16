const { nanoid } = require("nanoid");
const notes = require("./notes");

const addNoteHandler = (request, h)=>{
    const {title, tags, body} = request.payload;
    
    const id = nanoid(16);
    const createAt = new Date().toISOString();
    const updateAt = createAt;

    const newNote = {
        title,tags,body, id, createAt, updateAt,
    };

    notes.push(newNote);
    
    const isSuccess = notes.filter((note) => note.id === id).length > 0 ;
    if (isSuccess){
        const response = h.response({
            status: 'success',
            message : 'Catatan Sudah Ditambahkan',
            data : {
                noteId : id,
            },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status : 'fail',
        message: 'Catatan gagal ditambahkan',

    });
    response.code(500);
    return response;

};

//handler untuk mendapatkan detail notes
const getNotesByIdHandler = (request, h)=>{
    const {id} = request.params;

    const note = notes.filter((n)=>n.id === id)[0];

    if(note !== undefined){
        return{
            status: 'success',
            data: {
                note,
            },
    };
    }


    const response = h.response({
        status : 'fail',
        message: ' Catatan tidak ditemukan',
    });
    response.code(404);
    return response;
};






//handler untuk mendapatkan notes dari input user
const getAllNotesHandler = ()=>({
    status : 'success',
    data: {
        notes,
    },
});



const editNoteByIdHandler = (request, h)=>{
    const {id} = request.params;
    const {title, tags, body} = request.payload;
    const updateAt = new Date().toISOString();
    const index = notes.findIndex((note)=> note.id === id);
    if(index !== -1){
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updateAt
        };
        const respone = h.response({
            status : 'success',
            message: 'Catatan berhasil diperbaharui',
        });
        respone.code(200);
        return respone;
    }
    const respone = h.response({
        status: 'fail',
        message: ' Gagal memperbaharui catatan, Id tidak ditemukan'
    });
    respone.code(404);
    return respone;
};



const deleteNotesByIdHandler = (request, h)=>{
    const {id} = request.params;
    const index = notes.findIndex((note)=>note.id===id);

    if (index !== -1){
        notes.splice(index, 1);
        const response = h.response({
            status : 'success',
            message: 'Catatan Berhasil dihapus',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status : 'fail',
        message: 'Catatan Gagal dihapus, Id tidak ditemukan',
    });
        response.code(404);
        return response;

}


module.exports = {addNoteHandler, getAllNotesHandler, getNotesByIdHandler,editNoteByIdHandler, deleteNotesByIdHandler};
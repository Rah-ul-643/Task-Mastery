const mongoose= require('mongoose');

const taskSchema= new mongoose.Schema({

    email:{
        type: String,
        required: true
    },
    boards: [
        {   
            id:{
                type: Number,
                required:true
            },
            title: String,
            description: String,
            tasks: [
                {
                    id: {
                        type: String,
                        required: true
                    },
                    title: String,
                    deadline: Date,
                    description: String,
                    priority : String
                }
            ]
        }
        
    ]
    
    
});

module.exports= mongoose.model('tasks',taskSchema);
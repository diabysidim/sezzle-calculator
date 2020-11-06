
// linked list to log active chatrooms

class Log{

    constructor(data, next){

        this.data = data;
        this.next = next;
    }

}
class LogList{

    constructor(){

        this.head = null;
        this.tail = null;
        this.size = 0; 
    }

    addLog(logInfo){

        
        if(!this.head){

            this.head = new Log(logInfo, null);
            this.tail = this.head;
            this.size++; 

        }
        else{

            if(this.size < 10){
                this.tail.next= new Log(logInfo, null);
                this.tail= this.tail.next;
                this.size++;
            }
            else{
                this.tail.next= new Log(logInfo, null);
                this.tail= this.tail.next;
                this.head = this.head.next;
            }
            
        }
       
        
    }

    toArray(){
        const array =[]
        let temp = this.head;
        while(temp!=null){

            array.push( temp.data);
            temp= temp.next;

        }
        return array;
    }

    toList(array){

        array.forEach(element => {

            this.addLog(element);
            
        });

    }
}


module.exports=LogList;

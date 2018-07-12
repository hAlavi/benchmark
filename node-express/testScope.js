var invoice ={
    num: 100,

    mfunc:function(){
        return this.num;
    }
}
var unbounded = invoice.mfunc;
var bounded = unbounded.bind(invoice);
console.log(bounded())
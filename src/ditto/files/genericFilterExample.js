export const dataJson= {
    queryName:"getFilterTestList",
    pagination: true,
    inputList:[{
        keyElement: "fileName", 
        span:8, 
        placeholder:"insert file name",
        label:"File Name", type:"text",
        required:true
    },
    {
        keyElement: "dateFrom", 
        span:4, 
        label:"Recived date From", 
        type:"date-simple", 
        mode:"simple",
        format:"DD-MM-YYYY"
    },
    {
        keyElement: "purchaseOrder", span:4, label:"Purchase Order", type:"text", placeholder:"insert purchase order"
    },
    {
        keyElement: "batchId", span:4, label:"Batch Id", type:"text", placeholder:"insert batch id", priority:true
    },
    {
        keyElement: "salePlace", span:4, label:"Sale Place", type:"select", placeholder:"Select Sale Place", 
        options:[{val: "0", descr:"0"}, {val:"7", descr:"7"},{val: "8", descr:"8"}, {val:"9", descr:"9"}]
    },
    /*{
        keyElement: "status", span:6, label:"Status", type:"select", placeholder:"Select Status", 
        options:[{val: "0", descr:"UNPROCESSED"}, {val:"1", descr:"INTERFACTURAS_ACCEPTED"},{val: "2", descr:"INTERFACTURAS_PROCESSED"}, {val:"3", descr:"DONE"}]
    },*/
    {
        keyElement: "afipStatus", span:6, label:"Afip Status", type:"select", placeholder:"Select Status", 
        options:[{val: "0", descr:"ACCEPTED"}, {val:"1", descr:"REJECTED"},{val: "2", descr:"PARTIALLY_ACCEPTED"}]
    },
    {
        keyElement: "intStatus", span:4, label:"Interfacturas Status", type:"select", placeholder:"Select Int. Status", required:true,
        options:[{val: "101", descr:"101"}, {val:"102", descr:"102"},{val: "103", descr:"103"}, {val:"200", descr:"200"}]
    },
    {
        keyElement: "invoiceNumber", type:"column"
    },
    {
        keyElement: "errorCode", span:4, label:"Error Code", type:"select", placeholder:"Select Error Code",
        options:[{val: "101", descr:"101"}, {val:"102", descr:"102"},{val: "103", descr:"103"}, {val:"200", descr:"200"}]
    }, 
    {
        keyElement: "status", span:4, label:"Test Combo", type:"select-by-query", placeholder:"Test with query",
        queryName:"selectTest"
    },       
    {
        keyElement: "idFile", type:"column"
    },],
    buttonsList: [
        {
            keyElement: "fileName", label:"Limpiar", type:"button", mode:"clear"
        },
        {
            keyElement: "dateFrom", label:"Search", type:"button", mode:"submit"
        }
    ],
    actions:[
        {keyElement:"showName", referenceId: "invoiceNumber",type:"name"},
        {keyElement:"downloadButton", referenceId: "idFile",type:"download", url:"download/!val", text:"Download XML", icon:"file-excel"},
        {keyElement:"mutationAction", referenceId: "errorCode", type:"mutation", text:"Mutation Test", name:"mutationTest"}
    ] 
}
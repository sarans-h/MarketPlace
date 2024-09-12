class ApiFeatures{
    constructor(query,querStr){
        this.query = query;
        this.queryStr=querStr
    }
    search(){
        const keyword=this.queryStr.keyword?{
            name:{
                $regex:this.queryStr.keyword,
                $options:"i"
            
            },

        }:{}
        
        
        this.query=this.query.find({...keyword})
        return this;
    }
    filter(){
        const querCopy={...this.queryStr};
        // console.log(querCopy);
        
        // first we remove some fields like keyword because it is usedd for search
        const removeFields=["keyword","page","limit"];
        removeFields.forEach(key=>delete querCopy[key]);
        // console.log(querCopy);

        // filter for price and rating
        
        let queryString=JSON.stringify(querCopy);
        // console.log(queryString);
        queryString=queryString.replace(/\b(gt|gte|lt|lte)\b/g,key=>`$${key}`);    
        

        this.query=this.query.find(JSON.parse(queryString));
        
        return this;
        
        
    }
    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page)  || 1;
        const skip = resultPerPage * (currentPage - 1);
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}
module.exports=ApiFeatures;
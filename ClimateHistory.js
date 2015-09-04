
// ClimateHistory object
ClimateHistory = function(){
    o_temperatures = ['cool','normal','warm'];
    o_precipitations = ['dry','normal', 'wet'];
    this.a_annualConditions = [];
}

ClimateHistory.prototype = {
    
    // return all of the annual conditions
    getAnnualConditions: function(){
        return this.a_annualConditions;  
    },
    // return the possible temperatures
    getTemperatures: function(){
        return o_temperatures;
    },
    // return the possible precipitations
    getPrecipitation: function(){
        return o_precipitations;
    },
    // add a year with the provided temperature and precipitation conditions
    addYear: function(s_temperature, s_precipitation){
        this.a_annualConditions.push(new Array(s_temperature, s_precipitation));
    },
    // remove the last year
    removeYear: function(){
       this.a_annualConditions.pop(); 
    },
    // reset
    resetClimateHistory: function(){
        this.a_annualConditions = [];
    },
    
    // debug
    debug: function(){
        console.log(this);   
    }
    
}

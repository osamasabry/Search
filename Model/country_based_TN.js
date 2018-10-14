var mongoose = require('mongoose');
// var bcrypt   = require('bcrypt-nodejs');

var rxp_CountryBasedTNSchema = mongoose.Schema({
    
    CountryBasedTN_Code                            :Number,
	CountryBasedTN_Price     	  				   :String,
    CountryBasedTN_Images                          :[String],
    CountryBasedTN_TN_Code                         :Number,
    CountryBasedTN_Country_ID                      :Number,
    
},{
    toObject: { virtuals: true }
});

rxp_CountryBasedTNSchema.virtual('CountryBasedTNCountry', {
    ref: 'rxp_countries',
    localField: 'CountryBasedTN_Country_ID',
    foreignField: 'Country_Code',
    justOne: true // for many-to-1 relationships

});

var CountryBasedTN_table = module.exports = mongoose.model('rxp_country_based_tn', rxp_CountryBasedTNSchema);


module.exports.getLastCode = function(callback){
    
    CountryBasedTN_table.findOne({},callback).sort({CountryBasedTN_Code:-1});
}
function authRequired(req, res, next) {
    console.log(req.user);
    if (!req.user)   {
        req.session.oauth2return = req.originalUrl;
        return res.redirect('/login');
    }else if(req.user.email=="lammou@mail.mbc.edu.mo")
    {
        console.log("author");
        next();
    }else{
        req.session.oauth2return = req.originalUrl;
        return res.redirect('/login');
    }
}
function authMathsRequired(req, res, next) {
    if (!req.user)   {
        req.session.oauth2return = req.originalUrl;
        return res.redirect('/login');
    }else if(req.user.email=="lammou@mail.mbc.edu.mo"
            ||profile.email=="sousoiteng@mail.mbc.edu.mo"
            ||profile.email=="laitakseng@mail.mbc.edu.mo" )
    {
        console.log("author");
        next();
    }else{
        req.session.oauth2return = req.originalUrl;
        return res.redirect('/login');
    }
}
module.exports = {
    required: authRequired,
    MahtsRequired: authMathsRequired,
};

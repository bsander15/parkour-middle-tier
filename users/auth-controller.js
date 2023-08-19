import * as usersDao from './users-dao.js';

// Trying to run login or register on Postman gives me a Cannot POST api/users/x error,
// whether or not I temporarily disable credentials

const AuthController = (app) => {
    const register = async (req, res) => {
        const username = req.body.username;
        const user = await usersDao.findUserByUsername(username)
        if (user) {
            res.sendStatus(404)
            return
        } else {
            const newUser = await usersDao.createUser(req.body)
            req.session['currentUser'] = newUser // store user in current session
            res.json(newUser) // return user
        }
    }

    const login = async (req, res) => {
        const {username, password} = req.body
        const user = await usersDao.findUserByCredentials(username, password)
        console.log(user)
        if (user) {
            req.session["currentUser"] = user
            res.json(user)
        } else {
            res.sendStatus(404)
        }
    }

    const profile  = (req, res) => {
        const currentUser = req.session["currentUser"]
        if (!currentUser) {
            res.sendStatus(404)
            return
        }
        res.json(currentUser)
    }

    const logout   = (req, res) => { 
        req.session.destroy()
        res.sendStatus(200)
    }

    const update = async (req, res) => {
        const id = req.params._id
        const updates = req.body
        const status = await usersDao.updateUser(id, updates)
        res.json(status)
    }

    app.post("/api/users/register", register)
    app.post("/api/users/login",    login)
    app.post("/api/users/profile",  profile)
    app.post("/api/users/logout",   logout)
    app.put ("/api/users/:username", update)
}

export default AuthController
import User from './User'

const Users = ({users, onDelete}) => {
    return (
        <div className="row">
        {
            //Iterates on users array and displays each user inside card
            users.map((user)=><User key={user.id} user={user} onDelete={onDelete}/>)
        }
        </div>
    )
}



export default Users

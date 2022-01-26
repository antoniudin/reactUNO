import React, {useContext, useEffect} from 'react'
import PlayerContext from './PlayerContext'
import CartContext from './CartContext'

function UserPanel(props) {
    const context = useContext(PlayerContext)
    const cartContext = useContext(CartContext)
    
    useEffect = () => {
        console.log(context)
    }

    return (
        <div>
            <p>Here is the button</p>
            <button onClick={()=>context.onLoggedIn()}>GO</button>
            <p>{context.currentUser.name}</p>
            {cartContext.map(cartItem =>
                <p key={cartItem}>{cartItem}</p>
                )}
        </div>
    )
}

export default UserPanel;

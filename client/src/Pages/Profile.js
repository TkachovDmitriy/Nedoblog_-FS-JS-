import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../actions/itemsAction'

const mapStaytToProps = (state) => ({
   user: state.item.user
})

export default connect(mapStaytToProps, {getUser}) (function Profile (props) {
    // console.log(user)
    useEffect(
        () => {
            props.getUser()
          }, []
    )
        return (
            <>
                <h3></h3>
            </>
        )
})
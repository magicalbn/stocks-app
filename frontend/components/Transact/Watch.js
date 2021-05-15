import React, { useEffect, useState } from 'react';
import { getWatchlist, addtoWatchlist, removefromWatchlist } from '../../lib/watchlist-lib'
import { useToasts } from 'react-toast-notifications'
import Spinner from '../UI/Spinner'


const Watch = (props) => {
    const [watching, setwatching] = useState(false)
    const [isLoading,setisLoading] = useState(false)


    let content = watching ? 'Remove from WatchList' : 'Add to WatchList'
    const { addToast } = useToasts()
    useEffect(() => {
        getWatchlist().then(stocks => {
            let search = stocks.find(each => each == props.symbol)

            if (search) {
                setwatching(true)
            }
        })
            .catch(err => console.log(err.response))

    }, [])

    const watchfunction = () => {
        setisLoading(true)
        const data = {
            symbol: props.symbol
        }
        if (watching) {
            removefromWatchlist(data).then(res => {

                setwatching(!watching)
                addToast(res, {
                    appearance: 'success',
                    autoDismiss: true,
                })
                setisLoading(false)
            })
                .catch(err => {
                    console.log(err.response)
                    addToast(err.response.data, {
                        appearance: 'error',
                        autoDismiss: true,
                    })
                    setisLoading(false)
                })
        } else
            addtoWatchlist(data).then(res => {

                setwatching(!watching)
                addToast(res, {
                    appearance: 'success',
                    autoDismiss: true,
                })
                setisLoading(false)
            })
                .catch(err => {
                    console.log(err.response)
                    addToast(err.response.data, {
                        appearance: 'error',
                        autoDismiss: true,
                    })
                    setisLoading(false)
                })
    }

    return (
        <div className={'watchlist ' + (watching ? 'unwatch' : 'watch')} onClick={() => watchfunction()}>
            {isLoading?<Spinner/>: content}
        </div>
    )
}

export default Watch
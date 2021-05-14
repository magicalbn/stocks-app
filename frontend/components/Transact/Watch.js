import React, { useEffect, useState } from 'react';
import { getWatchlist, addtoWatchlist, removefromWatchlist } from '../../lib/watchlist-lib'
import { useToasts } from 'react-toast-notifications'
const Watch = (props) => {
    const [watching, setwatching] = useState(false)
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
            })
                .catch(err => {
                    console.log(err.response)
                    addToast(err.response.data, {
                        appearance: 'error',
                        autoDismiss: true,
                    })
                })
        } else
            addtoWatchlist(data).then(res => {

                setwatching(!watching)
                addToast(res, {
                    appearance: 'success',
                    autoDismiss: true,
                })
            })
                .catch(err => {
                    console.log(err.response)
                    addToast(err.response.data, {
                        appearance: 'error',
                        autoDismiss: true,
                    })
                })
    }

    return (
        <div className={'watchlist ' + (watching ? 'unwatch' : 'watch')} onClick={() => watchfunction()}>
            {content}
        </div>
    )
}

export default Watch
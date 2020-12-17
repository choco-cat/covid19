export default function Tooltip({style, dataCountry}) {
    return(
        <div id="tooltip" style={style}>
            {dataCountry.data}
        </div>
    ) 
}


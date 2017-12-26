import Link from 'next/link'

const linkStyle = {
    fontSize: 16,
    backgroundColor: '#a0e233',
    padding: '10px'
}

const Header = () => (
    <div>
        <Link href='/'><a style={linkStyle}>Index</a></Link>
        <Link href='/about'><a style={linkStyle}>About</a></Link>
    </div>
)

export default Header

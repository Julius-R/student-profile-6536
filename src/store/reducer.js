const [nameFilter, setNameFilter] = useState('');
const [tagFilter, setTagFilter] = useState('');

const [filteredComponent, setFilteredComponent] = useState([]);


useEffect(() => {
    // Filter filterComponent by name and tag
    const filteredComponent = component.filter(component => {
        return component.name.toLowerCase().includes(nameFilter) && component.tags.includes(tagFilter);
    
}, [nameFilter, tagFilter]);

import Countries from './Countries/Countries';
import './Filter.css';

const Filter = ({ countries, language, tags }) => {
    return (
        <div className='filter'>
            <input type="text" placeholder='Search for a station' />
            <div className="select-opt">
                <Countries countries={countries} />
                <select name="languages" id="">
                    <option value="null">All languages</option>
                    {language.map((lang, i) => (
                        <option key={lang.iso_639 + i} value={lang.iso_639}>
                            {lang.name}
                        </option>
                    ))}
                </select>
                <select name="tags" id="">
                    <option value="null">All tags</option>
                    {tags.map((tag, i) => (
                        <option key={tag.name + i} value={tag.name}>
                            {tag.name}
                        </option>
                    ))}
                </select>
                <button>Search</button>
            </div>
        </div>
    );
};

export default Filter;
import './Search.css';
import stations from '../../../public/docs/mock-api/stations.json';
import StationList from '../StationList/StationList';

const page = async ({ searchParams }) => {
  const {
    name = '',
    country = '',
    language = '',
    tag = '',
    strict = 'false',
  } = searchParams;

  // Приводим к булеву strict
  const isStrict = strict === 'true';

  // Функция проверки фильтров по одному полю с учетом strict
  const matchField = (fieldValue, filterValue) => {
    if (!filterValue) return true; // если фильтр пустой - пропускаем

    if (isStrict) {
      // строгий режим - точное сравнение, регистр игнорируем
      return fieldValue.toLowerCase() === filterValue.toLowerCase();
    } else {
      // нестрогий - partial match (includes), регистр игнорируем
      return fieldValue.toLowerCase().includes(filterValue.toLowerCase());
    }
  };

  // Фильтрация
  const searchResults = stations.filter(station => {
    // Проверяем все фильтры, если хоть один не проходит — исключаем
    if (!matchField(station.name, name)) return false;
    if (!matchField(station.country, country)) return false;
    if (!matchField(station.language, language)) return false;

    // tag может быть массивом или строкой, сделаем проверку по тегу
    if (tag) {
      const tags = Array.isArray(station.tags.split(',')) ? station.tags.split(',') : [];
      // strict - точное совпадение, non strict - includes
      const tagMatch = isStrict
        ? tags.some(t => t.toLowerCase() === tag.toLowerCase())
        : tags.some(t => t.toLowerCase().includes(tag.toLowerCase()));
      if (!tagMatch) return false;
    }

    return true;
  });

  return (
    <div className='search'>
      <h1>Searching by: {name && 'Name - ' + name} {country && 'Country - ' + country} {language && 'Language - ' + language} {tag && 'Tag - ' + tag} | Search results ({searchResults.length})</h1>
      
      <StationList stations={searchResults} />
    </div>
  );
};

export default page;

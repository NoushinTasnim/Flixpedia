import { SMALL_IMG_BASE_URL } from "../utils/constants";
import PropTypes from 'prop-types';

const Provider = ({ content }) => {
    console.log(content);
    return (
      <div>
        {Object.entries(content).map(([countryCode, countryData]) => (
          <div key={countryCode} className="mb-8">
            <h2 className="text-lg font-bold">{countryCode}</h2>
            <a href={countryData.link} target="_blank" rel="noopener noreferrer" className="block mb-4 text-blue-500">
              Watch here
            </a>
            <div className="flex space-x-4">
              {countryData.flatrate?.map((provider) => (
                <img 
                  key={provider.provider_id} 
                  src={`${SMALL_IMG_BASE_URL}${provider.logo_path}`} 
                  alt={provider.provider_name} 
                  title={provider.provider_name} 
                  className="w-12 h-12 object-contain"
                />
              ))}
              {countryData.buy?.map((provider) => (
                <img 
                  key={provider.provider_id} 
                  src={`${SMALL_IMG_BASE_URL}${provider.logo_path}`} 
                  alt={provider.provider_name} 
                  title={provider.provider_name} 
                  className="w-12 h-12 object-contain"
                />
              ))}
              {countryData.rent?.map((provider) => (
                <img 
                  key={provider.provider_id} 
                  src={`${SMALL_IMG_BASE_URL}${provider.logo_path}`} 
                  alt={provider.provider_name} 
                  title={provider.provider_name} 
                  className="w-12 h-12 object-contain"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };
  Provider.propTypes = {
    content: PropTypes.object.isRequired,
  };

export default Provider
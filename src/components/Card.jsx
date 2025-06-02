import React from 'react';
import PropTypes from 'prop-types';

function Card({ icon: Icon, color, text }) {
  return (
    <div className="flex flex-col items-start gap-3 p-5 bg-white rounded-2xl shadow-xl w-64">
      <div className={`p-2 rounded-full bg-opacity-10 ${color}`}>
        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
      </div>
      <p className="text-gray-700 text-base leading-snug">
        {text}
      </p>
    </div>
  );
}

Card.propTypes = {
  icon: PropTypes.elementType.isRequired,
  color: PropTypes.string,
  text: PropTypes.string.isRequired,
};

Card.defaultProps = {
  color: 'bg-blue-500',
};

export default Card;

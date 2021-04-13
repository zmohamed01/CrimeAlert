class Location < ApplicationRecord
	serialize :image, JSON
	
	has_one_attached :image
	
	validates :datetime, presence: true
	validates :address, presence: true
	
	geocoded_by :address
	after_validation :geocode, if: :address_changed?
end

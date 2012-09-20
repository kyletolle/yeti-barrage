require 'htmlentities' 

class Yeti < ActiveRecord::Base
  attr_accessible :lat, :long, :name

  validates :name, { presence: true, length: { maximum: 100 } }
  validates :lat, { presence: true, numericality: { greater_than: -90, less_than: 90} }
  validates :long, { presence: true, numericality: { greater_than: -180, less_than: 180} }

  # Encode entities before validation so that the encoded string is still required to
  # be less than the maximum length.
  before_validation do
    self.name = HTMLEntities.new.encode(name)
  end
end

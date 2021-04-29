class ContactsController < ApplicationController
	def new
		@contact = Contact.new
	end
	
	def create
		@contact = Contact.new(params[:contact])
		@contact.request = request
		if @contact.deliver
			flash.now[:error] = nil
		else
			flash.now[:error] = 'Message cannot be send.'
			render :new
		end
	end
end

class CustomersController < ApplicationController
  
  @single_symbol  = :customer
  
  def index
    # @users = User.limit(2).order("id DESC")
    
    @objects = Customer.page(params[:page]).per(params[:limit]).order("id DESC")

    respond_to do |format|
      format.json { render :json => { :customers => @objects , :total => Customer.all.count } }
    end
  end

  def create
    @object = Customer.new(params[:customer])

    respond_to do |format|
      if @object.save
        format.json { render :json => { :success => true, :customers => [@object] , 
                                        :total => Customer.all.count } }
      end
    end
  end

  def update
    @object = Customer.find(params[:id])
    # sleep 2 
    respond_to do |format|
      if @object.update_attributes(params[:customer])
        format.json { render :json => { :success => true, :customers => [@object],
                                        :total => Customer.all.count  } }
      end
    end
  end

  def destroy
    @object = Customer.find(params[:id])
    @object.destroy

    respond_to do |format|
      format.json { render :json => { :success => true, :total => Customer.all.count } }
    end
  end
end

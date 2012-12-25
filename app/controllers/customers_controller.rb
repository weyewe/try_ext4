class CustomersController < ApplicationController
  
  @class = Customer 
  @plural_symbol  = :customers
  @single_symbol  = :customer
  
  def index
    # @users = User.limit(2).order("id DESC")
    
    @objects = @class.page(params[:page]).per(params[:limit]).order("id DESC")

    respond_to do |format|
      format.json { render :json => { @plural_symbol => @objects , :total => @class.all.count } }
    end
  end

  def create
    @object = @class.new(params[@single_symbol])

    respond_to do |format|
      if @user.save
        format.json { render :json => { :success => true, @plural_symbol => [@object] , :total => @class.all.count } }
      end
    end
  end

  def update
    @object = @class.find(params[:id])
    # sleep 2 
    respond_to do |format|
      if @object.update_attributes(params[@single_symbol])
        format.json { render :json => { :success => true, @plural_symbol => [@object], :total => @class.all.count  } }
      end
    end
  end

  def destroy
    @object = @class.find(params[:id])
    @object.destroy

    respond_to do |format|
      format.json { render :json => { :success => true, :total => @class.all.count } }
    end
  end
end

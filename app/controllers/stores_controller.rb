class StoresController < ApplicationController
  
  
  def index
    # @users = User.limit(2).order("id DESC")
    
    @objects = Store.page(params[:page]).per(params[:limit]).order("id DESC")

    respond_to do |format|
      format.json { render :json => { :stores => @objects , :total => Store.all.count } }
    end
  end

  def create
    @object = Store.new(params[:store])

    respond_to do |format|
      if @object.save
        format.json { render :json => { :success => true, :stores => [@object] , 
                                        :total => Store.all.count } }
      end
    end
  end

  def update
    @object = Store.find(params[:id])
    # sleep 2 
    respond_to do |format|
      if @object.update_attributes(params[:store])
        format.json { render :json => { :success => true, :stores => [@object],
                                        :total => Store.all.count  } }
      end
    end
  end

  def destroy
    @object = Store.find(params[:id])
    @object.destroy

    respond_to do |format|
      format.json { render :json => { :success => true, :total => Store.all.count } }
    end
  end
end

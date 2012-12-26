class DepartmentsController < ApplicationController
  
  
  def index
    # @users = User.limit(2).order("id DESC")
    
    @objects = Department.page(params[:page]).per(params[:limit]).order("id DESC")

    respond_to do |format|
      format.json { render :json => { :departments => @objects , :total => Department.all.count } }
    end
  end

  def create
    @object = Department.new(params[:department])

    respond_to do |format|
      if @object.save
        format.json { render :json => { :success => true, :departments => [@object] , 
                                        :total => Department.all.count } }
      end
    end
  end

  def update
    @object = Department.find(params[:id])
    # sleep 2 
    respond_to do |format|
      if @object.update_attributes(params[:department])
        format.json { render :json => { :success => true, :departments => [@object],
                                        :total => Department.all.count  } }
      end
    end
  end

  def destroy
    @object = Department.find(params[:id])
    @object.destroy

    respond_to do |format|
      format.json { render :json => { :success => true, :total => Department.all.count } }
    end
  end
end

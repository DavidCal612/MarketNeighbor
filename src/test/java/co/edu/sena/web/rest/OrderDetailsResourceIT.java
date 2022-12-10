package co.edu.sena.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import co.edu.sena.IntegrationTest;
import co.edu.sena.domain.OrderDetails;
import co.edu.sena.domain.Product;
import co.edu.sena.repository.OrderDetailsRepository;
import co.edu.sena.security.AuthoritiesConstants;
import co.edu.sena.service.OrderDetailsService;
import co.edu.sena.service.dto.OrderDetailsDTO;
import co.edu.sena.service.mapper.OrderDetailsMapper;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link OrderDetailsResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser(authorities = { AuthoritiesConstants.ADMIN, AuthoritiesConstants.SUPPORT })
class OrderDetailsResourceIT {

    private static final String DEFAULT_PRICE = "AAAAAAAAAA";
    private static final String UPDATED_PRICE = "BBBBBBBBBB";

    private static final Long DEFAULT_AMOUNT = 1L;
    private static final Long UPDATED_AMOUNT = 2L;

    private static final String ENTITY_API_URL = "/api/order-details";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private OrderDetailsRepository orderDetailsRepository;

    @Mock
    private OrderDetailsRepository orderDetailsRepositoryMock;

    @Autowired
    private OrderDetailsMapper orderDetailsMapper;

    @Mock
    private OrderDetailsService orderDetailsServiceMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restOrderDetailsMockMvc;

    private OrderDetails orderDetails;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OrderDetails createEntity(EntityManager em) {
        OrderDetails orderDetails = new OrderDetails().price(DEFAULT_PRICE).amount(DEFAULT_AMOUNT);
        // Add required entity
        Product product;
        if (TestUtil.findAll(em, Product.class).isEmpty()) {
            product = ProductResourceIT.createEntity(em);
            em.persist(product);
            em.flush();
        } else {
            product = TestUtil.findAll(em, Product.class).get(0);
        }
        orderDetails.setProduct(product);
        return orderDetails;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OrderDetails createUpdatedEntity(EntityManager em) {
        OrderDetails orderDetails = new OrderDetails().price(UPDATED_PRICE).amount(UPDATED_AMOUNT);
        // Add required entity
        Product product;
        if (TestUtil.findAll(em, Product.class).isEmpty()) {
            product = ProductResourceIT.createUpdatedEntity(em);
            em.persist(product);
            em.flush();
        } else {
            product = TestUtil.findAll(em, Product.class).get(0);
        }
        orderDetails.setProduct(product);
        return orderDetails;
    }

    @BeforeEach
    public void initTest() {
        orderDetails = createEntity(em);
    }

    @Test
    @Transactional
    void createOrderDetails() throws Exception {
        int databaseSizeBeforeCreate = orderDetailsRepository.findAll().size();
        // Create the OrderDetails
        OrderDetailsDTO orderDetailsDTO = orderDetailsMapper.toDto(orderDetails);
        restOrderDetailsMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(orderDetailsDTO))
            )
            .andExpect(status().isCreated());

        // Validate the OrderDetails in the database
        List<OrderDetails> orderDetailsList = orderDetailsRepository.findAll();
        assertThat(orderDetailsList).hasSize(databaseSizeBeforeCreate + 1);
        OrderDetails testOrderDetails = orderDetailsList.get(orderDetailsList.size() - 1);
        assertThat(testOrderDetails.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testOrderDetails.getAmount()).isEqualTo(DEFAULT_AMOUNT);
    }

    @Test
    @Transactional
    void createOrderDetailsWithExistingId() throws Exception {
        // Create the OrderDetails with an existing ID
        orderDetails.setId(1L);
        OrderDetailsDTO orderDetailsDTO = orderDetailsMapper.toDto(orderDetails);

        int databaseSizeBeforeCreate = orderDetailsRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrderDetailsMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(orderDetailsDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the OrderDetails in the database
        List<OrderDetails> orderDetailsList = orderDetailsRepository.findAll();
        assertThat(orderDetailsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkPriceIsRequired() throws Exception {
        int databaseSizeBeforeTest = orderDetailsRepository.findAll().size();
        // set the field null
        orderDetails.setPrice(null);

        // Create the OrderDetails, which fails.
        OrderDetailsDTO orderDetailsDTO = orderDetailsMapper.toDto(orderDetails);

        restOrderDetailsMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(orderDetailsDTO))
            )
            .andExpect(status().isBadRequest());

        List<OrderDetails> orderDetailsList = orderDetailsRepository.findAll();
        assertThat(orderDetailsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkAmountIsRequired() throws Exception {
        int databaseSizeBeforeTest = orderDetailsRepository.findAll().size();
        // set the field null
        orderDetails.setAmount(null);

        // Create the OrderDetails, which fails.
        OrderDetailsDTO orderDetailsDTO = orderDetailsMapper.toDto(orderDetails);

        restOrderDetailsMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(orderDetailsDTO))
            )
            .andExpect(status().isBadRequest());

        List<OrderDetails> orderDetailsList = orderDetailsRepository.findAll();
        assertThat(orderDetailsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllOrderDetails() throws Exception {
        // Initialize the database
        orderDetailsRepository.saveAndFlush(orderDetails);

        // Get all the orderDetailsList
        restOrderDetailsMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(orderDetails.getId().intValue())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE)))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.intValue())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllOrderDetailsWithEagerRelationshipsIsEnabled() throws Exception {
        when(orderDetailsServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restOrderDetailsMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(orderDetailsServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllOrderDetailsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(orderDetailsServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restOrderDetailsMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(orderDetailsServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    void getOrderDetails() throws Exception {
        // Initialize the database
        orderDetailsRepository.saveAndFlush(orderDetails);

        // Get the orderDetails
        restOrderDetailsMockMvc
            .perform(get(ENTITY_API_URL_ID, orderDetails.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(orderDetails.getId().intValue()))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.intValue()));
    }

    @Test
    @Transactional
    void getNonExistingOrderDetails() throws Exception {
        // Get the orderDetails
        restOrderDetailsMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewOrderDetails() throws Exception {
        // Initialize the database
        orderDetailsRepository.saveAndFlush(orderDetails);

        int databaseSizeBeforeUpdate = orderDetailsRepository.findAll().size();

        // Update the orderDetails
        OrderDetails updatedOrderDetails = orderDetailsRepository.findById(orderDetails.getId()).get();
        // Disconnect from session so that the updates on updatedOrderDetails are not directly saved in db
        em.detach(updatedOrderDetails);
        updatedOrderDetails.price(UPDATED_PRICE).amount(UPDATED_AMOUNT);
        OrderDetailsDTO orderDetailsDTO = orderDetailsMapper.toDto(updatedOrderDetails);

        restOrderDetailsMockMvc
            .perform(
                put(ENTITY_API_URL_ID, orderDetailsDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(orderDetailsDTO))
            )
            .andExpect(status().isOk());

        // Validate the OrderDetails in the database
        List<OrderDetails> orderDetailsList = orderDetailsRepository.findAll();
        assertThat(orderDetailsList).hasSize(databaseSizeBeforeUpdate);
        OrderDetails testOrderDetails = orderDetailsList.get(orderDetailsList.size() - 1);
        assertThat(testOrderDetails.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testOrderDetails.getAmount()).isEqualTo(UPDATED_AMOUNT);
    }

    @Test
    @Transactional
    void putNonExistingOrderDetails() throws Exception {
        int databaseSizeBeforeUpdate = orderDetailsRepository.findAll().size();
        orderDetails.setId(count.incrementAndGet());

        // Create the OrderDetails
        OrderDetailsDTO orderDetailsDTO = orderDetailsMapper.toDto(orderDetails);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOrderDetailsMockMvc
            .perform(
                put(ENTITY_API_URL_ID, orderDetailsDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(orderDetailsDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the OrderDetails in the database
        List<OrderDetails> orderDetailsList = orderDetailsRepository.findAll();
        assertThat(orderDetailsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchOrderDetails() throws Exception {
        int databaseSizeBeforeUpdate = orderDetailsRepository.findAll().size();
        orderDetails.setId(count.incrementAndGet());

        // Create the OrderDetails
        OrderDetailsDTO orderDetailsDTO = orderDetailsMapper.toDto(orderDetails);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOrderDetailsMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(orderDetailsDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the OrderDetails in the database
        List<OrderDetails> orderDetailsList = orderDetailsRepository.findAll();
        assertThat(orderDetailsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamOrderDetails() throws Exception {
        int databaseSizeBeforeUpdate = orderDetailsRepository.findAll().size();
        orderDetails.setId(count.incrementAndGet());

        // Create the OrderDetails
        OrderDetailsDTO orderDetailsDTO = orderDetailsMapper.toDto(orderDetails);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOrderDetailsMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(orderDetailsDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the OrderDetails in the database
        List<OrderDetails> orderDetailsList = orderDetailsRepository.findAll();
        assertThat(orderDetailsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateOrderDetailsWithPatch() throws Exception {
        // Initialize the database
        orderDetailsRepository.saveAndFlush(orderDetails);

        int databaseSizeBeforeUpdate = orderDetailsRepository.findAll().size();

        // Update the orderDetails using partial update
        OrderDetails partialUpdatedOrderDetails = new OrderDetails();
        partialUpdatedOrderDetails.setId(orderDetails.getId());

        partialUpdatedOrderDetails.price(UPDATED_PRICE);

        restOrderDetailsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedOrderDetails.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedOrderDetails))
            )
            .andExpect(status().isOk());

        // Validate the OrderDetails in the database
        List<OrderDetails> orderDetailsList = orderDetailsRepository.findAll();
        assertThat(orderDetailsList).hasSize(databaseSizeBeforeUpdate);
        OrderDetails testOrderDetails = orderDetailsList.get(orderDetailsList.size() - 1);
        assertThat(testOrderDetails.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testOrderDetails.getAmount()).isEqualTo(DEFAULT_AMOUNT);
    }

    @Test
    @Transactional
    void fullUpdateOrderDetailsWithPatch() throws Exception {
        // Initialize the database
        orderDetailsRepository.saveAndFlush(orderDetails);

        int databaseSizeBeforeUpdate = orderDetailsRepository.findAll().size();

        // Update the orderDetails using partial update
        OrderDetails partialUpdatedOrderDetails = new OrderDetails();
        partialUpdatedOrderDetails.setId(orderDetails.getId());

        partialUpdatedOrderDetails.price(UPDATED_PRICE).amount(UPDATED_AMOUNT);

        restOrderDetailsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedOrderDetails.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedOrderDetails))
            )
            .andExpect(status().isOk());

        // Validate the OrderDetails in the database
        List<OrderDetails> orderDetailsList = orderDetailsRepository.findAll();
        assertThat(orderDetailsList).hasSize(databaseSizeBeforeUpdate);
        OrderDetails testOrderDetails = orderDetailsList.get(orderDetailsList.size() - 1);
        assertThat(testOrderDetails.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testOrderDetails.getAmount()).isEqualTo(UPDATED_AMOUNT);
    }

    @Test
    @Transactional
    void patchNonExistingOrderDetails() throws Exception {
        int databaseSizeBeforeUpdate = orderDetailsRepository.findAll().size();
        orderDetails.setId(count.incrementAndGet());

        // Create the OrderDetails
        OrderDetailsDTO orderDetailsDTO = orderDetailsMapper.toDto(orderDetails);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOrderDetailsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, orderDetailsDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(orderDetailsDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the OrderDetails in the database
        List<OrderDetails> orderDetailsList = orderDetailsRepository.findAll();
        assertThat(orderDetailsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchOrderDetails() throws Exception {
        int databaseSizeBeforeUpdate = orderDetailsRepository.findAll().size();
        orderDetails.setId(count.incrementAndGet());

        // Create the OrderDetails
        OrderDetailsDTO orderDetailsDTO = orderDetailsMapper.toDto(orderDetails);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOrderDetailsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(orderDetailsDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the OrderDetails in the database
        List<OrderDetails> orderDetailsList = orderDetailsRepository.findAll();
        assertThat(orderDetailsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamOrderDetails() throws Exception {
        int databaseSizeBeforeUpdate = orderDetailsRepository.findAll().size();
        orderDetails.setId(count.incrementAndGet());

        // Create the OrderDetails
        OrderDetailsDTO orderDetailsDTO = orderDetailsMapper.toDto(orderDetails);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOrderDetailsMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(orderDetailsDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the OrderDetails in the database
        List<OrderDetails> orderDetailsList = orderDetailsRepository.findAll();
        assertThat(orderDetailsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteOrderDetails() throws Exception {
        // Initialize the database
        orderDetailsRepository.saveAndFlush(orderDetails);

        int databaseSizeBeforeDelete = orderDetailsRepository.findAll().size();

        // Delete the orderDetails
        restOrderDetailsMockMvc
            .perform(delete(ENTITY_API_URL_ID, orderDetails.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<OrderDetails> orderDetailsList = orderDetailsRepository.findAll();
        assertThat(orderDetailsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
